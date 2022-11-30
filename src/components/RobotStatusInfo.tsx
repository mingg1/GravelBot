import { Box, Icon, Text } from 'native-base';
import { ReactNode } from 'react';

interface RobotStatusInfoProps {
  info: string;
  tag?: string;
  fontSize?: number | string;
  icon: any;
  iconName: string;
  iconSize: number;
}

const RobotStatusInfo = ({
  info,
  tag,
  fontSize,
  icon,
  iconName,
  iconSize,
}: RobotStatusInfoProps) => {
  return (
    <Box
      flexDir="row"
      bgColor={tag === 'location' ? 'orange.400' : 'green.600'}
      alignSelf="flex-start"
      px={3}
      py={1}
      borderRadius={15}
      alignItems="center"
    >
      <Icon as={icon} name={iconName} size={iconSize} color="white" mr={1} />
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

export default RobotStatusInfo;
