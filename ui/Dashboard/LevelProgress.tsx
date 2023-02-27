import { API_URL } from "@/lib/api/fetchApi";
import { useSRS } from "@/lib/hooks/srs";
import { SRSUserData } from "@/lib/models/srs";
import { cardColors } from "@/lib/theme";
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  HStack,
  Link,
  LinkBox,
  LinkOverlay,
  Progress,
  Stack,
  Text,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import SVG from "../SVG";

export type LevelProgressProps = {
  completeCardProgress: number;
};
export function LevelProgress({ completeCardProgress }: LevelProgressProps) {
  const { data } = useSRS();

  if (!data) {
    return <></>;
  }

  // TODO: get the correct level
  const userLevel = 1;

  const radicals = data.filter(
    (c) => c.subject.kind == "radical" && c.subject.level == userLevel
  );
  const kanjis = data.filter(
    (c) => c.subject.kind == "kanji" && c.subject.level == userLevel
  );

  // const vocabs = cards.filter(c => c.kind == "vocabulary")

  // we don't consider vocabularies to pass levels
  const requiredCards = Math.ceil(kanjis.length * 0.9);

  const kanjisDone = kanjis.reduce((tot, { progress }) => {
    return tot + (progress >= completeCardProgress ? 1 : 0);
  }, 0);

  let totalProgress = kanjis.reduce((tot, { progress }) => {
    return tot + (progress >= completeCardProgress ? 1 : 0);
  }, 0);

  totalProgress = clamp(
    requiredCards == 0 ? 0 : totalProgress / requiredCards,
    0.0,
    1.0
  );

  // apply mask when `progress != 1.0`
  const progressMask =
    totalProgress > 0 && totalProgress < 1.0
      ? `
    radial-gradient(7.25px at calc(100% - 10.25px) 50%,#000 99%,#0000 101%) 0 calc(50% - 10px)/100% 20px,
    radial-gradient(7.25px at calc(100% + 5.25px) 50%,#0000 99%,#000 101%) calc(100% - 5px) 50%/100% 20px repeat-y;
  `
      : undefined;

  return (
    <Card shadow="none" rounded="2xl">
      <CardHeader
        position="relative"
        zIndex={1}
        roundedTop="2xl"
        roundedBottom="sm"
        overflow="hidden"
        _before={{
          content: `""`,
          zIndex: -1,
          bgColor: "blue.100",
          w: `${totalProgress * 100}%`,
          h: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          mask: progressMask,
        }}
        _after={{
          content: `""`,
          zIndex: -1,
          bgColor: "blue.200",
          w: `calc(${totalProgress * 100}% - ${
            kanjis.length - kanjisDone == 0 ? 0 : 10
          }px)`,
          h: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          mask: progressMask,
        }}
        // pt={2}
        // px={2}
      >
        <HStack justifyContent="space-between" alignItems={"center"}>
          <Text textTransform="capitalize" fontSize="lg">
            Level {userLevel} Progress
          </Text>
          <Text as="span">
            {kanjisDone} / {requiredCards} kanji
          </Text>
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack align="flex-start" spacing={6}>
          <VStack align="flex-start">
            <Text fontWeight={"medium"}>Radicals</Text>
            <HStack flexWrap={"wrap"} gap={2} rowGap={3} spacing={0}>
              {radicals.map((r, i) => (
                <CardProgress key={i} card={r} />
              ))}
            </HStack>
          </VStack>
          <VStack align="flex-start">
            <Text fontWeight={"medium"}>Kanji</Text>
            <HStack flexWrap={"wrap"} gap={2} rowGap={3} spacing={0}>
              {kanjis.map((r, i) => (
                <CardProgress key={i} card={r} />
              ))}
            </HStack>
          </VStack>
        </Stack>
      </CardBody>
    </Card>
  );
}

function CardProgress({ card }: { card: SRSUserData["cards"][number] }) {
  return (
    <Stack spacing={1} align="center">
      <LinkBox>
        <Center
          w={10}
          h={10}
          bg={cardColors[card.subject.kind]}
          color="white"
          rounded={"lg"}
        >
          <>
            <LinkOverlay href={`/${card.subject.kind}/${card.subject.slug}`}>
              <VisuallyHidden>
                {card.subject.kind} {card.subject.name.toLowerCase()}
              </VisuallyHidden>
            </LinkOverlay>
            {card.subject.value ? (
              card.subject.value
            ) : (
              <SVG
                url={`${API_URL}/files/${card.subject.value_image?.url}`}
                style={{
                  width: "50%",
                  stroke: "currentColor",
                  fill: "none",
                  strokeWidth: "60px",
                }}
              />
            )}
          </>
        </Center>
      </LinkBox>
      <Progress
        colorScheme={cardColors[card.subject.kind].split(".")[0]}
        w="85%"
        size={"xs"}
        value={(card.progress / 5) * 100}
        rounded="sm"
        background={"gray.300"}
        hasStripe
      />
    </Stack>
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
