import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteReview } from '../../utils/review';
import ReviewModal from '../reviewModal/ReviewModal';

const EditDeleteButtons = ({ reviewId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: handleDelete, isLoading } = useMutation(
    () => deleteReview(reviewId),
    {
      onSuccess: () => {
        alert('평론이 삭제되었습니다.');
        queryClient.invalidateQueries('reviews');
      },
      onError: (error) => {
        alert(`삭제 중 오류가 발생했습니다! : ${error.message}`);
      },
    }
  );

  const confirmAndDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      handleDelete();
    }
  };

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <span>
        <button onClick={handleEditClick}>수정</button>
        <button onClick={confirmAndDelete} disabled={isLoading}>
          삭제
        </button>
      </span>
      {modalOpen && (
        <ReviewModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          reviewId={reviewId}
        />
      )}
    </>
  );
};

export default EditDeleteButtons;
