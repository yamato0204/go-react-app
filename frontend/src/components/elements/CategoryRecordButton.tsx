import { Button, Link } from "@chakra-ui/react";


const CategoryRecordButton = () => {
    return (
        <Link href="http://localhost:3000/category/create">
            <Button colorScheme='blue' size='lg'>カテゴリを登録</Button>
            </Link>
    );
}

export default CategoryRecordButton;