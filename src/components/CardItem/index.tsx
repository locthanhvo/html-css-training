import { DragEvent, memo, useCallback, useMemo } from 'react';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

// Utils
import { calculateDaysLeft, countLines } from '@/utils';

// Icons
import {
  ClockIcon,
  AttachmentIcon,
  HamburgerMenuIcon,
} from '@/components/common/Icons';

interface CardItemProps {
  id: string;
  title?: string;
  description?: string;
  label?: { name: string; value: string }[];
  startDate?: string;
  endDate?: string;
  images?: string[];
  members?: { image: string; value: string }[];
  onClick?: (id: string) => void;
  onDragStart: (event: DragEvent<HTMLDivElement>, taskId: string) => void;
}

const CardItem = ({
  id,
  title,
  description,
  label,
  startDate,
  endDate,
  members,
  images,
  onClick,
  onDragStart,
}: CardItemProps) => {
  const daysLeft =
    startDate && endDate && calculateDaysLeft(startDate, endDate);

  const countLineDescription = description && countLines(description);

  const handleClickTask = useCallback(() => {
    onClick?.(id);
  }, [onClick, id]);

  const labelElements = useMemo(
    () =>
      Boolean(label?.length) && (
        <Flex gap={1}>
          {label?.map(({ name, value }) => (
            <Box key={`label-${value}`}>
              <Text size="sm" color="coolGray">
                {name}
              </Text>
            </Box>
          ))}
        </Flex>
      ),
    [label],
  );

  const memberElements = useMemo(
    () =>
      Boolean(members?.length) && (
        <Flex>
          {members?.map(({ image, value }) => (
            <Image
              borderRadius="full"
              boxSize="20px"
              src={image}
              alt="Avatar"
              key={value}
            />
          ))}
        </Flex>
      ),
    [members],
  );

  const handleDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      onDragStart(event, id);
    },
    [onDragStart],
  );

  return (
    <Card
      data-testid="cart-item"
      cursor="pointer"
      w={230}
      borderRadius="md"
      draggable
      onClick={handleClickTask}
      _hover={{
        border: '1px solid',
        borderColor: 'lightRed',
      }}
      onDragStart={handleDragStart}
    >
      <CardBody p={0}>
        <Image
          display={images?.length ? 'block' : 'none'}
          borderTopRadius="md"
          src={images?.[0]}
          alt={`${title} image`}
          w={230}
          h={129}
          objectFit="contain"
        />

        <Stack spacing="3" p={3}>
          <Flex
            gap={2}
            direction={(label || []).length >= 2 ? 'column' : 'row'}
            justifyContent="space-between"
          >
            {labelElements}

            <Flex>{memberElements}</Flex>
          </Flex>
          <Text size="base" color="primary">
            {title}
          </Text>

          <Flex justifyContent="space-between" alignItems="center">
            <Flex
              display={Number(countLineDescription) > 1 ? 'flex' : 'none'}
              justifyContent="space-between"
              alignItems="center"
            >
              <HamburgerMenuIcon />
              <Text textAlign="center" size="sm" color="coolGray">
                {countLineDescription}
              </Text>
            </Flex>

            <Flex
              display={images?.length ? 'flex' : 'none'}
              justifyContent="space-between"
              alignItems="center"
            >
              <AttachmentIcon />
              <Text size="sm" color="coolGray">
                {images?.length}
              </Text>
            </Flex>

            <Flex
              display={daysLeft ? 'flex' : 'none'}
              justifyContent="space-between"
              alignItems="center"
            >
              <ClockIcon {...(Number(daysLeft) === 1 && { color: 'red' })} />
              <Text size="sm" color={Number(daysLeft) > 1 ? 'coolGray' : 'red'}>
                {daysLeft} Days Left
              </Text>
            </Flex>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default memo(CardItem);
