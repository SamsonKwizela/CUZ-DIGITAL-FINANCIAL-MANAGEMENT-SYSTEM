import { Button, Checkbox, Group, TextInput, NumberInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { IconCalendar } from "@tabler/icons-react";
import "@mantine/dates/styles.css";

const PersonInfo = ({ form }) => {
  const [value, setValue] = useState(null); // ✅ fixed

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Full Name"
          placeholder="Samson Kwizela"
        />

        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <NumberInput label="Phone" placeholder="+260" />

        <DatePickerInput
          label="Date of Birth"
          placeholder="Select your D.O.B"
          icon={<IconCalendar size={18} />}
          value={value}
          onChange={setValue}
          valueFormat="DD/MM/YYYY"
          required
          withAsterisk
          maxDate={new Date()}
        />

        <TextInput label="Address" placeholder="Lusaka" />

        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          key={form.key("termsOfService")}
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  );
};

export default PersonInfo;
