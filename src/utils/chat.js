import axios from './axiosInstance';

// 채팅 관련 API

/** 채팅방 목록 조회 (검색, 관련 영화 제목, 방 제목 포함) */
export const searchChatrooms = (query, page, size) =>
  axios.get(
    '/chat/chatroom',
    {
      params: { q: query, page, size },
    },
    { withCredentials: false }
  );

/** 채팅방 생성 */
export const createChatroom = (chatroomData) =>
  axios.post('/chat/create', chatroomData);

/** 채팅방 입장 */
export const joinChatroom = (chatRoomId) =>
  axios.post(`/chat/${chatRoomId}/join`);

/** 채팅방 퇴장 */
export const exitChatroom = (chatRoomId) =>
  axios.post(`/chat/${chatRoomId}/exit`);

/** 찬성 / 반대 투표 */
export const voteInChatroom = (chatRoomId, voteData) =>
  axios.post(`/chat/${chatRoomId}/vote`, voteData);
