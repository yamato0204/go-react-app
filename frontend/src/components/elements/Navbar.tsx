
import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import NextLink from "next/link";

const Navbar = () => {

  return (
    <Flex shadow="md"  bg="gray.400" p={4} color="white">
      <NextLink href="/home"  passHref>
       <Box mr={8}>
        <Text as='b' color="black" >マイページ</Text>
        </Box>
      </NextLink>
     
          <NextLink href="/record" passHref>
      <Box mr={8}>
      <Text as='b' color="black" >積み上げ記録</Text>
        </Box>
      </NextLink>
      <Spacer />
{/* 
      {AuthState ? (

      <NextLink href="/course" passHref 
      onClick={handleLogout}>
      <Box mr={8}>
      <Text as='b' color="black"
       >ログアウト</Text>
        </Box>
      </NextLink>


      ):(

        <NextLink href="/login" passHref>
        <Box mr={8}>
        <Text as='b' color="black" >サインイン</Text>
          </Box>
        </NextLink>

      )}

      {AuthState ? (
        <h5>{AuthState.username}</h5> 

      ):(

        <NextLink href="/register" passHref>
        <Box mr={8}>
        <Text as='b' color="black" >サインアップ</Text>
          </Box>
        </NextLink>
       

      )} */}

     
     
    </Flex>
  );
};

export default Navbar;
 
