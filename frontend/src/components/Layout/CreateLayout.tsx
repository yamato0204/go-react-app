import { Box } from "@chakra-ui/react";
import RecordForm from "../elements/CreateForm";

const CreateLayout = () => {
    return (
        <Box h={800} display='flex' justifyContent='center' alignItems='center' bg='gray.100'>
           <RecordForm />

       </Box>

    );
}

export default CreateLayout;