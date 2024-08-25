import React, { useCallback } from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';
import { useNavigate } from 'react-router';

const PaginationBlock = styled.div`
  width: 320px;
  height: 4rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  justify-content: space-between;
  align-items: center;
`

const PageNumber = styled.div``;

const buildLink = ({ username, page, subject }) => {
  const query = qs.stringify({ page, subject });
  return username ? `/${username}?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, username, subject }) => {
  const navigator = useNavigate();

  const onGoNextPage = useCallback(() => {
    navigator(buildLink({username, page: page + 1, subject}));
  }, [page, username, navigator, subject]);

  const onGoPreviousPage = useCallback(() => {
    navigator(buildLink({username, page: page - 1, subject}));
  }, [page, username, navigator, subject]);

  return (
    <PaginationBlock>
      <ButtonsWrapper>
        <Button
          disabled={page === 1}
          onClick={onGoPreviousPage}
        >
          이전
        </Button>
        <PageNumber>{page}</PageNumber>
        <Button
          disabled={page === lastPage}
          onClick={onGoNextPage}
        >
          다음
        </Button>
      </ButtonsWrapper>
    </PaginationBlock>
  );
};

export default Pagination;