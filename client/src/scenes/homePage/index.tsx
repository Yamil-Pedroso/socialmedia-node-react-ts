
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../scenes/navbar";
import UserWidget from "../../scenes/widgets/UserWidget";
import MyPostWidget from "../../scenes/widgets/MyPostWidget";
import PostsWidget from "../../scenes/widgets/PostsWidget";
import AdvertWidget from "../../scenes/widgets/AdvertWidget";
import FriendListWidget from "../../scenes/widgets/FriendListWidget";
import MyChat from "../../components/my-chat/MyChat";
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picPath } = useSelector((state: any) => state.user);
  const loggedInUser = useSelector((state: any) => state.user);
  console.log("loggedInUser", loggedInUser);


  return (
    <Box>
      <Navbar closeDropdowns={function (): void {
        throw new Error("Function not implemented.");
      } } id={0} title={""} description={""} date={""} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picPath={picPath} userPicturePath={""} />
          <MyChat />
        </Box>
       
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picPath={picPath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;