import { gql } from '@apollo/client';

export const CREATE_CHAT = gql`
  mutation CreateChat($title: String!) {
    insert_chats_one(object: { title: $title }) {
      id
      title
    }
  }
`;

export const INSERT_USER_MESSAGE = gql`
  mutation InsertUserMessage($chat_id: uuid!, $content: String!) {
    insert_messages_one(
      object: { chat_id: $chat_id, content: $content, role: "user" }
    ) {
      id
    }
  }
`;

export const SEND_MESSAGE_TO_BOT = gql`
  mutation SendMessageToBot($chat_id: uuid!, $message: String!) {
    sendMessageToBot(chat_id: $chat_id, message: $message) {
      reply
    }
  }
`;