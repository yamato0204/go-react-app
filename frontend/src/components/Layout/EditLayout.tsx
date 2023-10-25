import { Box } from "@chakra-ui/react";
import RecordForm from "../elements/CreateForm";
import EditForm from "../elements/EditiForm";

const EditLayout = () => {
    return (
        <Box h={800} display='flex' justifyContent='center' alignItems='center' bg='gray.100'>
           
            <EditForm />

       </Box>

    );
}

export default EditLayout;