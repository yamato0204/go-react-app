import React, { useState } from 'react'

import {  IconButton, Input, InputGroup,  } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { FaMagnifyingGlass } from "react-icons/fa6";

const Serch = () => {

   
    return (

      <InputGroup m={4} w={2/3} >
      < FaMagnifyingGlass size={36} mr={8} />
      <Input
        ml={4} type="text" placeholder="検索"
      />
    </InputGroup>

    





    );
}

export default Serch;
