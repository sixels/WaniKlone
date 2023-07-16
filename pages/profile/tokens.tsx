import { fetchJSON, isApiError } from "@/lib/api/utils";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useCheckbox,
  useCheckboxGroup,
  useDisclosure,
} from "@chakra-ui/react";
import {
  DocumentTextIcon,
  EllipsisHorizontalCircleIcon,
  TrashIcon,
} from "@sixels-heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "react";

import {
  TokensService,
  tokens_APITokenPermissions,
  tokens_UserTokenPartial,
} from "@/lib/apigen";

interface Token {
  // TODO: snake case
  ID: string;
  Prefix: string;
}

const TokensPage = () => {
  const [userTokens, setUserTokens] = useState<tokens_UserTokenPartial[]>();

  useEffect(() => {
    TokensService.getTokenQuery()
      .then((res) => res.data && setUserTokens(res.data))
      .catch((e) => console.error(e));
    // fetchJSON<Token[]>("http://127.0.0.1:8080/api/token", {
    //   credentials: "include",
    // })
    //   .then((data) => {
    //     if (!data) {
    //       console.debug("no token data");
    //       return;
    //     }

    //     if (isApiError(data)) {
    //       console.error(data);
    //     } else {
    //       console.debug("token data:", data);
    //       setUserTokens(data);
    //     }
    //   })
    //   .catch(console.error);
  }, []);

  return (
    <Container maxW={"6xl"} mt={10}>
      <Box as="section">
        <HStack justifyContent={"space-between"}>
          <Heading
            size="lg"
            pb="5"
            fontWeight={"normal"}
            w="fit-content"
            display="block"
          >
            Personal API tokens
          </Heading>
          <CreateTokenButton />
        </HStack>

        {userTokens && userTokens.length > 0 ? (
          <>
            <Text color="gray.700">Tokens you have generated.</Text>
            <TableContainer pt="2">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Prefix</Th>
                    <Th>Created</Th>
                    <Th>Status</Th>
                    <Th>Last Used</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {userTokens.map((token, i) => (
                    <Tr key={i}>
                      <Td>{token.name}</Td>
                      <Td fontFamily={"monospace"} color="red.600">
                        {token.prefix}
                      </Td>
                      <Td>Just now</Td>
                      <Td textTransform={"capitalize"}>{token.status}</Td>
                      <Td>{token.used_at ?? "Never"}</Td>
                      <Td>More</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Center>
            <Text> You have no tokens. </Text>
          </Center>
        )}
      </Box>
    </Container>
  );
};

export default TokensPage;

const CreateTokenButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="outline"
        rounded="none"
        colorScheme={"blue"}
        onClick={onOpen}
      >
        Generate New Token
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new API token</ModalHeader>
          <ModalBody>
            <CreateTokenForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const TOKEN_PERMISSIONS = [
  "deck:create",
  "deck:delete",
  "deck:update",
  "subject:create",
  "subject:update",
  "subject:delete",
  "review:create",
  "study_material:create",
  "study_material:update",
  "user:update",
];

const CreateTokenForm = () => {
  const [tokenName, setTokenName] = useState("");

  const { value, getCheckboxProps } = useCheckboxGroup();

  useEffect(() => {
    console.log(value);
  }, [value]);

  const createToken = () => {
    const permMap = {
      "deck:create": "token_permission_deck_create",
      "deck:delete": "token_permission_deck_delete",
      "deck:update": "token_permission_deck_update",
      "subject:create": "token_permission_subject_create",
      "subject:update": "token_permission_subject_update",
      "subject:delete": "token_permission_subject_delete",
      "review:create": "token_permission_review_create",
      "study_material:create": "token_permission_study_material_create",
      "study_material:update": "token_permission_study_material_update",
      "user:update": "token_permission_user_update",
    };
    let permissions: tokens_APITokenPermissions = {};

    for (const perm of value) {
      const permField = permMap[
        perm as keyof typeof permMap
      ] as keyof typeof permissions;
      permissions[permField] = true;
    }

    TokensService.postTokenCreate({
      name: tokenName,
      permissions,
      // Permissions: TOKEN_PERMISSIONS,
    })
      .then(console.log)
      .catch(console.error);
    // fetch("http://127.0.0.1:8080/api/token", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(value),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.debug("token create response:", data);
    //     alert(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createToken();
        }}
      >
        <FormLabel as="legend">Name</FormLabel>
        <Input
          variant="filled"
          required
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <FormLabel as="legend" mt="2">
          Permissions
        </FormLabel>
        <CheckboxGroup>
          <Stack maxH={"260px"} overflow="auto">
            <Checkbox {...getCheckboxProps({ value: "deck:create" })}>
              deck:create
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "deck:delete" })}>
              deck:delete
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "deck:update" })}>
              deck:update
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "subject:create" })}>
              subject:create
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "subject:update" })}>
              subject:update
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "subject:delete" })}>
              subject:delete
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "review:create" })}>
              review:create
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "study_material:create" })}>
              study_material:create
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "study_material:update" })}>
              study_material:update
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "user:update" })}>
              user:update
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "user:delete" })}>
              user:delete
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        <ButtonGroup mt="4" spacing="4">
          <Button colorScheme={"red"}>Cancel</Button>
          <Button type="submit">Create</Button>
        </ButtonGroup>
      </form>
    </>
  );
};
