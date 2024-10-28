import { useSelector } from "react-redux";
import ArrangeMeetingUserList from "../../components/meetings/ArrangeMeetingUserList";
const ArrangeMeetingUserListConatiner = () => {
   const { userDatas } = useSelector((state) => state.meetings);
   return (
      <ArrangeMeetingUserList userDatas={userDatas} />
   )
}

export default ArrangeMeetingUserListConatiner;