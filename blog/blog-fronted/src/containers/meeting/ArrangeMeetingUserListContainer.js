import { useDispatch, useSelector } from "react-redux";
import ArrangeMeetingUserList from "../../components/meetings/ArrangeMeetingUserList";
import { insertUserToCart } from "../../modules/meetings";

const ArrangeMeetingUserListConatiner = () => {
   const { userDatas } = useSelector((state) => state.meetings);
   const dispatch = useDispatch();

   const onClick = (userData) => {
      dispatch(insertUserToCart(userData));
   }

   return (
      <ArrangeMeetingUserList userDatas={userDatas} onClick={onClick} />
   )
}

export default ArrangeMeetingUserListConatiner;