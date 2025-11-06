import React from "react";
import {
  Container,
  Text,
  Card,
  Group,
  Stack,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { IconEye, IconEyeOff, IconRefresh } from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";

const Balance = () => {
  const { user } = useAuth();

  return (
    <Container size="lg" p="md">
      <Text size="2rem" fw={700} mb="xl">
        Account Balance
      </Text>

      <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
        <Group justify="space-between" mb="md">
          <div>
            <Text size="sm" c="dimmed">
              Current Account
            </Text>
            <Text fw={500}>Main Balance</Text>
          </div>
          <Badge color="green" variant="light">
            Active
          </Badge>
        </Group>

        <Text size="2.5rem" fw={700} c="blue" mb="xs">
          ZMW 2,450.75
        </Text>

        <Text size="sm" c="dimmed">
          Available: ZMW 2,325.25
        </Text>

        <Group mt="md">
          <ActionIcon variant="light" size="sm">
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon variant="light" size="sm">
            <IconRefresh size={16} />
          </ActionIcon>
        </Group>
      </Card>

      <Text c="dimmed" ta="center">
        Welcome {user?.name || "User"}, this is your balance overview.
      </Text>
    </Container>
  );
};

export default Balance;
