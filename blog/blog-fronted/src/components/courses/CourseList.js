import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const CourseListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const CourseItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;

  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const CourseItem = ({course, onInsertCourse, onDeleteCourse}) => {

   console.log(course);

  return (
    <CourseItemBlock>
      <h2 onClick={() => {onInsertCourse(course)}}>
         {course.course_name}
      </h2>
      <p>
         {course.professor}
      </p>
      <p>
         {course.class_time}
      </p>
    </CourseItemBlock>
  );
};

const CourseList = ({ courses, loading, error, onInsertCourse, onDeleteCourse }) => {
   // 에러 발생 시
   if (error) {
      return <CourseListBlock>에러가 발생했습니다.</CourseListBlock>;
   }
   // console.log("CourseList");
   // console.log(courses);
  return (
    <CourseListBlock>
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && courses && (
        <div>
          {courses.courses.map(course => (
            <CourseItem course={course} key={course.id} 
            onInsertCourse={onInsertCourse}
            onDeleteCourse={onDeleteCourse}
            />
          ))}
        </div>
      )}
    </CourseListBlock>
  );
};

export default CourseList;
