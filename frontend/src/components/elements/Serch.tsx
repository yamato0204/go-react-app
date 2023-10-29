import React, { useState } from 'react'

import {  IconButton, Input, InputGroup,  } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useUpdateUser } from '@/hooks/userContext';

const Serch = () => {

    const setUser = useUpdateUser()

   
    return (

      <InputGroup m={4} w={2/3} >
      < FaMagnifyingGlass size={36} mr={8} />
      <Input
                ml={4} type="text" placeholder="検索"
                onChange={(e) => setUser(e.target.value.toLowerCase())}
      />
    </InputGroup>

    





    );
}

export default Serch;
