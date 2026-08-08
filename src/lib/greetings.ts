type Greeting = {
  text: string;
  local?: boolean;
};

const localGreetings: Greeting[] = [
  { text: "Fawaka", local: true },
  { text: "Bun dey", local: true },
];

export function getGreeting(name: string) {
  const hour = new Date().getHours();

  let defaultGreeting: Greeting;

  if (hour >= 5 && hour < 12) {
    defaultGreeting = { text: "Good morning" };
  } else if (hour >= 12 && hour < 18) {
    defaultGreeting = { text: "Good afternoon" };
  } else {
    defaultGreeting = { text: "Good evening" };
  }

  // Occasionally use a local greeting.
  // Using the date keeps it stable during the day.
  const day = new Date().getDate();

  if (day % 4 === 0) {
    const localGreeting =
      localGreetings[day % localGreetings.length];

    return `${localGreeting.text}, ${name}`;
  }

  return `${defaultGreeting.text}, ${name}`;
}