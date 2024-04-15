import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 채팅 관련 API

/** 채팅방 목록 조회 (검색, 관련 영화 제목, 방 제목 포함) */
export const searchChatrooms = (query, page, size) =>
  axios.get(`${API_URL}/chat/chatroom`, {
    params: { q: query, page, size },
  });

/** 채팅방 생성 */
export const createChatroom = (chatroomData) =>
  axios.post(`${API_URL}/chat/create`, chatroomData);

/** 채팅방 입장 */
export const joinChatroom = (chatRoomId) =>
  axios.post(`${API_URL}/chat/${chatRoomId}/join`);

/** 채팅방 퇴장 */
export const exitChatroom = (chatRoomId) =>
  axios.post(`${API_URL}/chat/${chatRoomId}/exit`);

/** 찬성 / 반대 투표 */
export const voteInChatroom = (chatRoomId, voteData) =>
  axios.post(`${API_URL}/chat/${chatRoomId}/vote`, voteData);
