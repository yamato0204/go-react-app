import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";

const RecordCard = () => {
    return (
        <div>
           <Card>
  <CardHeader>
    <Heading size='md'>プログラミング</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
       
        <Box>
        <Heading size='xs' textTransform='uppercase'>
          reactを学習
        </Heading>
       
        <Text pt='2' fontSize='sm'>
          2時間40分
                            </Text>
                             <Text pt='2' fontSize='sm'>
          4/11
        </Text>
      </Box>
    </Stack>
  </CardBody>
            </Card >
            


             <Card mt="14">
  <CardHeader>
    <Heading size='md'>Client Report</Heading>
  </CardHeader>

                
  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
       
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Analysis
        </Heading>
        <Text pt='2' fontSize='sm'>
          See a detailed analysis of all your business clients.
        </Text>
      </Box>
    </Stack>
  </CardBody>
</Card>
        </div>
    );
}

export default RecordCard;