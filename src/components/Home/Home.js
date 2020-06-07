import React, { useRef, useState } from 'react';
import { Select, TYPE } from 'baseui/select';
import { useStyletron } from 'baseui';
export default () => {
  const [value, setValue] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const [css, theme] = useStyletron();
  const homeClass = css({
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });
  const headingClass = css({
    textAlign: 'center',
    margin: 'auto',
  });
  const h1Class = css({
    ...theme.typography.DisplayLarge,
    textShadow: theme.lighting.shadow700,
  });
  const selectParentClass = css({
    minWidth: '50%',
  });
  return (
    <div className={homeClass}>
      <div className={headingClass}>
        <h1 className={h1Class}>
          US and Canada city finder
        </h1>
      </div>
      <div className={selectParentClass}>
        <Select
          value={value}
          options={suggestions}
          loading={loading}
          type={TYPE.search}
          onChange={(params) => setValue(params.value)}
          placeholder="I'm looking for ..."
          inputRef={inputRef}
          overrides={{
            Root: {
              style: {
                margin: 'auto',
              },
            },
            Input: {
              style: {
                fontStyle: 'italic',
              },
            },
            InputContainer: {
              style: ({ $theme }) => ({
                borderTopColor: $theme.colors.white,
                borderBottomColor: $theme.colors.white,
                borderLeftColor: $theme.colors.white,
                borderRightColor: $theme.colors.white,
                backgroundColor: 'transparent',
              }),
            },
            DropdownContainer: {
              style: {
                minWidth: '50%',
              },
            },
          }}
        />
      </div>
    </div>
  );
};
