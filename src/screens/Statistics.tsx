import { Box, Container, Heading, HStack, Text } from 'native-base';

const Statistics = () => (
  <Box width="85%" marginX="auto">
    <Box my={4} px={6} py={4} borderRadius={12} backgroundColor="white">
      <HStack justifyContent="space-between" alignItems="center" space={4}>
        <Text fontSize="20%" color="green.800" fontWeight={600}>
          1km²
        </Text>
        <Heading size="sm"> Average covered area per hour</Heading>
      </HStack>
    </Box>
    <Box my={4} px={6} py={4} borderRadius={12} backgroundColor="white">
      <HStack justifyContent="space-between" alignItems="center" space={4}>
        <Text fontSize="20%" color="green.800" fontWeight={600}>
          25%
        </Text>
        <Heading size="sm"> Saved Co2 emission</Heading>
      </HStack>
    </Box>
    <Box my={4} px={6} py={4} borderRadius={12} backgroundColor="white">
      <HStack justifyContent="space-between" alignItems="center" space={4}>
        <Text fontSize="20%" color="green.800" fontWeight={600}>
          30%
        </Text>
        <Heading size="sm">Recycled gravel</Heading>
      </HStack>
    </Box>
  </Box>
);
export default Statistics;
