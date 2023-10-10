import React, { useState } from 'react'

import {  IconButton, Input, InputGroup,  } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';

const Serch = () => {

   
    return (

      <InputGroup m={4} w={2/3} >
      <IconButton aria-label='Search database' icon={<SearchIcon />} />
      <Input
        type="text" placeholder="検索"
      />
    </InputGroup>

    





    );
}

export default Serch;
