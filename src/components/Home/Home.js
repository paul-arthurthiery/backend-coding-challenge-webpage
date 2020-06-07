import React, { useState } from 'react';
import { Select, TYPE } from 'baseui/select';
import {
  Checkbox,
  STYLE_TYPE,
  LABEL_PLACEMENT,
} from 'baseui/checkbox';
import { useStyletron } from 'baseui';
import { Slider } from 'baseui/slider';
import { getSuggestions } from './HomeController';

const formatSuggestions = (suggestions) => suggestions.map((suggestion) => ({
  label: suggestion.name,
  id: suggestion.name,
}));

export default () => {
  const [fragment, setFragment] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [longitude, setLongitude] = React.useState([0]);
  const [latitude, setLatitude] = React.useState([0]);
  const onChange = (input) => {
    if (!input) {
      return setSuggestions([]);
    }
    setLoading(true);
    return getSuggestions(input, latitude[0], longitude[0]).then((newSuggestions) => {
      const formattedNewSuggestions = formatSuggestions(newSuggestions);
      setSuggestions(formattedNewSuggestions);
      setLoading(false);
    });
  };
  const toggleChecked = (checkedValue) => {
    setChecked(checkedValue);
    if (!checkedValue) {
      setLongitude([0]);
      setLatitude([0]);
    }
  };
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
    ...theme.typography.DisplayMedium,
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
        <Checkbox
          checked={checked}
          checkmarkType={STYLE_TYPE.toggle_round}
          onChange={(e) => toggleChecked(e.target.checked)}
          labelPlacement={LABEL_PLACEMENT.right}
          overrides={{
            Root: {
              style: {
                paddingBottom: '15px',
              },
            },
            Toggle: {
              style: ({ $checked, $theme }) => ({
                backgroundColor: $checked ? $theme.colors.accent : $theme.colors.primaryA,
              }),
            },
          }}
        >
          Search with coordinates
        </Checkbox>
        {!!checked && (
          <>
            <Slider
            value={latitude}
            onChange={({ value }) => value && setLatitude(value)}
            min={-90}
            max={90}
            step={0.00001}
          />
            <Slider
            value={longitude}
            onChange={({ value }) => value && setLongitude(value)}
            min={-180}
            max={180}
            step={0.00001}
          />
          </>
        )}
        <Select
          value={fragment}
          options={suggestions}
          isLoading={loading}
          type={TYPE.search}
          clearable={false}
          onChange={(params) => setFragment(params.value)}
          onInputChange={(e) => onChange(e.target.value)}
          placeholder="I'm looking for ..."
          onBlurResetsInput={false}
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
