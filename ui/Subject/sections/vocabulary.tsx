import { PartialKanjiResponse, Vocabulary } from "@/lib/models/cards";
import {
  PartialSubject,
  Sentence,
  StudyItem,
  Subject,
  Patterns,
  RemoteContent,
} from "@/lib/models/subject";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as wanakana from "wanakana";

import { PlayIcon } from "@radix-ui/react-icons";
import { SectionProps } from "../Section";
import { studyData, studyItem, studyItems } from "./common";
import { API_URL } from "@/lib/api/fetchApi";

export const vocabularySections = (
  vocabulary: Subject,
  kanjis?: PartialSubject[]
): SectionProps[] => {
  // const patterns = vocabulary.patterns ? vocabulary.patterns.map((pattern) => ([pattern.name, pattern.sentences])) : null

  let kanjisSection: SectionProps = {} as SectionProps;
  if (kanjis && kanjis.length) {
    kanjisSection = {
      title: "Kanji composition",
      sectionItems: [
        {
          component: <KanjiComposition kanjis={kanjis} />,
        },
      ],
    };
  }

  const additional_study_data = vocabulary.additional_study_data ?? {};
  const resources = vocabulary.resources ?? {};

  const meanings =
      studyData(vocabulary, "meaning")
        ?.items.filter((m) => !m.is_hidden && m.is_valid_answer)
        .map((m) => m.value) || [],
    meaningMnemonic = studyData(vocabulary, "meaning")?.mnemonic;

  const readings = studyData(vocabulary, "reading")?.items || [],
    readingMnemonic = studyData(vocabulary, "reading")?.mnemonic;

  const patterns: Patterns = additional_study_data["patterns"] || [],
    sentences: Sentence[] = additional_study_data["sentences"] || [],
    partsOfSpeech: string[] = additional_study_data["parts_of_speech"] || [];

  const pronunciationAudios = resources["reading_pronunciations"] || [];
  console.log(pronunciationAudios);

  return [
    {
      title: "Meaning",
      sectionItems: [
        {
          headlessTable: {
            table: [
              {
                title: "meanings",
                value: meanings.join(", "),
              },
              {
                title: "parts of speech",
                value: partsOfSpeech.join(", "),
              },
            ],
          },
        },
        {
          mdDoc: {
            title: "Mnemonic",
            content: meaningMnemonic || "",
          },
        },
      ],
    },
    {
      title: "Reading",
      sectionItems: [
        {
          horizontalList: {
            list: readings.map((reading) => ({
              value: (
                <ReadingListItem
                  reading={reading}
                  pronunciationAudios={pronunciationAudios}
                />
              ),
              valueProps: {
                fontSize: "xl",
                textTransform: undefined,
                fontWeight: "normal",
                color: undefined,
              },
            })),
          },
        },
        {
          mdDoc: {
            title: "Mnemonic",
            content: readingMnemonic || "",
          },
        },
      ],
    },
    {
      title: "Context",
      sectionItems: [
        patterns.length
          ? { component: <ContextPatterns patterns={patterns} /> }
          : ({} as any),
        sentences.length
          ? {
              component: <ContextSentences sentences={sentences} />,
            }
          : ({} as any),
      ],
    },
    { ...kanjisSection },
  ];
};

function ContextSentences({
  sentences,
}: {
  sentences: Sentence[];
}): JSX.Element {
  return (
    <Box>
      <Heading
        as="h4"
        size="md"
        py={3}
        color="GrayText"
        textTransform="capitalize"
      >
        Sentences
      </Heading>
      <Stack
        align="flex-start"
        spacing={6}
        divider={<StackDivider w={"80%"} />}
      >
        {sentences.map((sentence) => (
          <VStack align="flex-start" spacing={0}>
            <Text color="gray.900" lang={"jp"}>
              {sentence.jp}
            </Text>
            <Text color="gray.700">{sentence.en}</Text>
          </VStack>
        ))}
      </Stack>
    </Box>
  );
}

function ContextPatterns({ patterns }: { patterns: Patterns }): JSX.Element {
  return (
    <Tabs variant="line" my={5} orientation="vertical" defaultIndex={1} isLazy>
      <TabList gap={2} borderLeft="none" borderRightWidth="2px" px={1}>
        <Tab
          key={0}
          isDisabled
          cursor={"default !important"}
          userSelect="text"
          opacity="1 !important"
          pt={0}
          pb={2}
        >
          <Heading
            as="h3"
            size={{ base: "sm", md: "md" }}
            color="GrayText"
            whiteSpace="nowrap"
            fontWeight={"normal"}
            textTransform="capitalize"
            cursor={"text"}
          >
            Patterns of Use
          </Heading>
        </Tab>
        {Object.keys(patterns).map((patternName, i) => (
          <Tab
            key={i + 1}
            bg="white"
            border="none"
            rounded="md"
            _selected={{
              bgColor: "gray.700",
              color: "white",
            }}
          >
            {patternName}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel />
        {Object.values(patterns).map((pattern, i) => (
          <TabPanel key={i + 1} py={0} pl={3} pr={2}>
            <Heading
              as="h3"
              size={{ base: "sm", md: "md" }}
              color="GrayText"
              fontWeight={"normal"}
              textTransform="capitalize"
            >
              Common word combinations
            </Heading>
            {pattern.map((sentence, i) => (
              <VStack key={i} py="4" spacing={0} alignItems="start">
                <Text color="gray.900" lang="jp">
                  {sentence.jp}
                </Text>
                <Text color="gray.700">{sentence.en}</Text>
              </VStack>
            ))}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

function ReadingListItem({
  reading,
  pronunciationAudios,
}: {
  reading: StudyItem;
  pronunciationAudios: RemoteContent[];
}) {
  return (
    <HStack spacing={3} flexWrap={"wrap"}>
      <VStack spacing={0} pl={5}>
        <Text as="span" fontSize="xl" lang="jp">
          {reading.value}
        </Text>
        <Text as="span" color={"gray.600"} fontSize="sm">
          {wanakana.toRomaji(reading.value)}
        </Text>
      </VStack>
      {pronunciationAudios
        .filter((resource) => {
          const metadata = resource.metadata ?? {};
          return (
            resource.content_type == "audio/webm" &&
            (metadata["pronunciation"] || "") == reading.value
          );
        })
        .map((resource) => {
          const metadata = resource.metadata ?? {};

          const actorName: string = metadata["voice_actor_name"] || "",
            voiceDescription: string = metadata["voice_description"] || "",
            actorGender: string = metadata["gender"] || "";
          return {
            url: metadata.url,
            actorName,
            voiceDescription,
            actorGender,
          };
        })
        .sort((a, b) => a.actorName.localeCompare(b.actorName))
        .map(({ url, actorName, voiceDescription, actorGender }, i) => {
          return (
            <Button
              bg="blackAlpha.100"
              _hover={{ bg: "blackAlpha.200" }}
              px={3}
              variant="unstyled"
              onClick={() => {
                new Audio(`${API_URL}/files/${url}`).play();
              }}
            >
              <Flex
                key={i}
                gap={1}
                as="span"
                align="center"
                fontSize={"xs"}
                flexWrap={"wrap"}
              >
                <>
                  <PlayIcon />
                  <Text as="span" fontWeight="bold" fontSize={"sm"}>
                    {actorName}
                  </Text>
                  <Text as="span">
                    ({voiceDescription}, {actorGender})
                  </Text>
                </>
              </Flex>
            </Button>
          );
        })}
    </HStack>
  );
}

function KanjiComposition({ kanjis }: { kanjis: PartialSubject[] }) {
  return (
    <VStack mt={2} gap={1}>
      {kanjis.map(({ name, value: symbol, ...kanji }, i) => {
        const reading = studyItem(kanji, "reading", (si) => si.is_primary);

        return (
          <LinkBox key={i} w="full">
            <LinkOverlay href={`/kanji/${symbol}`}>
              <Flex
                alignItems="center"
                px={3}
                py={2}
                bg="pink.500"
                color="pink.50"
                rounded="md"
                shadow={"md"}
              >
                <Text as="span" lang="ja" flex={1}>
                  {symbol}
                </Text>
                <VStack lineHeight={"1em"} align="end">
                  <Text as="span" lang="ja">
                    <>
                      {"    "}
                      {reading?.value}
                      {"    "}
                    </>
                  </Text>
                  <Text as="span">{name}</Text>
                </VStack>
              </Flex>
            </LinkOverlay>
          </LinkBox>
        );
      })}
    </VStack>
  );
}
