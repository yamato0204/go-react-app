import { Box } from "@chakra-ui/layout";
import CategoryForm from "../elements/CategoryForm";

const  CategoryLayout = () => {
    return (
       

         <Box h={800} display='flex' justifyContent='center' alignItems='center' bg='gray.100'>
           <CategoryForm />

       </Box>
    );
}

export default  CategoryLayout;