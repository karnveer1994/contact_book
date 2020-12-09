import React from "react";
import MiniSearch from 'minisearch'
import PropTypes from 'prop-types'

const SearchBox = ({ data, setData, placeholder, fields, storeFields, primaryField }) => {
  const miniSearch = new MiniSearch({
    fields,
    storeFields,
    searchOptions: {
      fuzzy: 0.2,
      prefix: true,
      boost: { [primaryField]: 2 },
    },
  });

  miniSearch.addAll(data);

  const searchData = e => {
    const result =
      e.target.value === ""
        ? data
        : miniSearch.search(e.target.value);
    setData(result);
  };

  return <input type='text' onChange={searchData} placeholder={placeholder} />
};

SearchBox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  storeFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  primaryField: PropTypes.string.isRequired
}

export default SearchBox;