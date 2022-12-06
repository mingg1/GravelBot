import { Box, Icon, Text } from 'native-base';

interface HistoryStatusInfoProps {
  info: string;
  bgColor: string;
  fontSize?: string | number;
  position?: string;
}

const HistoryStatusInfo = ({
  info,
  bgColor,
  fontSize,
  position,
}: HistoryStatusInfoProps) => {
  return (
    <Box
      flexDir="row"
      bgColor={bgColor}
      alignSelf={position || 'flex-end'}
      px={3}
      py={1}
      borderRadius={15}
    >
      <Text
        color="white"
        fontSize={fontSize || 'md'}
        fontWeight="bold"
        letterSpacing={1.2}
      >
        {info}
      </Text>
    </Box>
  );
};

export default HistoryStatusInfo;
