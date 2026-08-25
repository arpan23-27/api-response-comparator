import { describe, expect, test } from "vitest";
import compareJson from "./compareJson";

describe("compareJson", () => {

    test("compares nested objects", () => {
  const first = {
    user: {
      name: "Arpan",
      city: "Kanpur",
    },
  };

  const second = {
    user: {
      name: "Arpan",
      city: "Lucknow",
    },
  };

  const result = compareJson(first, second);

  expect(result).toEqual([
    {
      path: "user.name",
      type: "unchanged",
      oldValue: "Arpan",
      newValue: "Arpan",
    },
    {
      path: "user.city",
      type: "modified",
      oldValue: "Kanpur",
      newValue: "Lucknow",
    },
  ]);
});


test("compares arrays", () => {
  const first = {
    skills: ["React", "Node.js"],
  };

  const second = {
    skills: ["React", "MongoDB"],
  };

  const result = compareJson(first, second);

  expect(result).toEqual([
    {
      path: "skills[0]",
      type: "unchanged",
      oldValue: "React",
      newValue: "React",
    },
    {
      path: "skills[1]",
      type: "modified",
      oldValue: "Node.js",
      newValue: "MongoDB",
    },
  ]);
});

test("detects deeply added fields", () => {
  const first = {
    user: {
      name: "Arpan",
    },
  };

  const second = {
    user: {
      name: "Arpan",
      address: {
        city: "Kanpur",
        country: "India",
      },
    },
  };

  const result = compareJson(first, second);

  expect(result).toEqual([
    {
      path: "user.name",
      type: "unchanged",
      oldValue: "Arpan",
      newValue: "Arpan",
    },
    {
      path: "user.address.city",
      type: "added",
      oldValue: undefined,
      newValue: "Kanpur",
    },
    {
      path: "user.address.country",
      type: "added",
      oldValue: undefined,
      newValue: "India",
    },
  ]);
});


test("detects deeply removed fields", () => {
  const first = {
    user: {
      name: "Arpan",
      address: {
        city: "Kanpur",
        country: "India",
      },
    },
  };

  const second = {
    user: {
      name: "Arpan",
    },
  };

  const result = compareJson(first, second);

  expect(result).toEqual([
    {
      path: "user.name",
      type: "unchanged",
      oldValue: "Arpan",
      newValue: "Arpan",
    },
    {
      path: "user.address.city",
      type: "removed",
      oldValue: "Kanpur",
      newValue: undefined,
    },
    {
      path: "user.address.country",
      type: "removed",
      oldValue: "India",
      newValue: undefined,
    },
  ]);
});








  test("detects unchanged fields", () => {
    const first = {
      name: "Arpan",
    };

    const second = {
      name: "Arpan",
    };

    const result = compareJson(first, second);

    expect(result).toEqual([
      {
        path: "name",
        type: "unchanged",
        oldValue: "Arpan",
        newValue: "Arpan",
      },
    ]);
  });

  test("detects modified fields", () => {
    const first = {
      name: "Arpan",
    };

    const second = {
      name: "John",
    };

    const result = compareJson(first, second);

    expect(result).toEqual([
      {
        path: "name",
        type: "modified",
        oldValue: "Arpan",
        newValue: "John",
      },
    ]);
  });

  test("detects added fields", () => {
    const first = {
      name: "Arpan",
    };

    const second = {
      name: "Arpan",
      role: "Developer",
    };

    const result = compareJson(first, second);

    expect(result).toEqual([
      {
        path: "name",
        type: "unchanged",
        oldValue: "Arpan",
        newValue: "Arpan",
      },
      {
        path: "role",
        type: "added",
        oldValue: undefined,
        newValue: "Developer",
      },
    ]);
  });

  test("detects removed fields", () => {
    const first = {
      name: "Arpan",
      role: "Developer",
    };

    const second = {
      name: "Arpan",
    };

    const result = compareJson(first, second);

    expect(result).toEqual([
      {
        path: "name",
        type: "unchanged",
        oldValue: "Arpan",
        newValue: "Arpan",
      },
      {
        path: "role",
        type: "removed",
        oldValue: "Developer",
        newValue: undefined,
      },
    ]);
  });
});