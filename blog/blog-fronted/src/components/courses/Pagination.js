import React, { useCallback } from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';
import { useNavigate } from 'react-router';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 4rem;
  padding-bottom: 8px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  justify-content: space-between;
  align-items: center;
`


const PageNumber = styled.div``;

const buildLink = ({ page }) => {
  const query = qs.stringify({ page });
  return `/course?${query}`;
};

const Pagination = ({ page, lastPage }) => {
  const navigator = useNavigate();

  const onGoNextPage = useCallback(() => {
    navigator(buildLink({page: page + 1}));
  }, [page, navigator]);

  const onGoPreviousPage = useCallback(() => {
    navigator(buildLink({page: page - 1}));
  }, [page, navigator]);

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
          // to={
          //   page === lastPage
          //     ? undefined
          //     : buildLink({ username, page: page + 1 })
          // }
          onClick={onGoNextPage}
        >
          다음
        </Button>
      </ButtonsWrapper>
    </PaginationBlock>
  );
};

export default Pagination;