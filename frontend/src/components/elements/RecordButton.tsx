import { Button, Link } from "@chakra-ui/react";




const RecordButton = () => {
    return (
        <Link href="http://localhost:3000/record/create">
            <Button colorScheme='blue' size='lg'>積み上げる</Button>
            </Link>
    );
}

export default RecordButton;