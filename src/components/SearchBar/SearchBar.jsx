import { useState } from 'react';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';
import propTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [inputToFind, setInputToFind] = useState('');

  const handleInputChange = event => {
    setInputToFind(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputToFind.toLocaleLowerCase().trim() === '') {
      return;
    }
    onSubmit(inputToFind);
    resetForm();
  };

  const resetForm = () => {
    setInputToFind('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="inputToFind"
          onChange={handleInputChange}
        />
      </SearchForm>
    </Header>
  );
};

// class SearchBar extends Component {
//   state = {
//     inputToFind: '',
//   };

//   static = {
//     onSubmit: propTypes.func.isRequired,
//   };

//   handleInputChange = event => {
//     this.setState({ inputToFind: event.target.value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.inputToFind.toLowerCase().trim() === '') {
//       return;
//     }
//     this.props.onSubmit(this.state.inputToFind);
//     this.resetForm();
//   };

//   resetForm = () => {
//     this.setState({ inputToFind: '' });
//   };

//   render() {
//     return (
//       <Header>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchFormButton type="submit">
//             <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//           </SearchFormButton>

//           <SearchFormInput
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="inputToFind"
//             onChange={this.handleInputChange}
//           />
//         </SearchForm>
//       </Header>
//     );
//   }
// }

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

// const SearchBar = ({ onSubmit }) => {
//   return (
//     <Header>
//       <SearchForm onSubmit={onSubmit}>
//         <SearchFormButton type="submit">
//           <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//         </SearchFormButton>

//         <SearchFormInput
//           type="text"
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//           name="inputToFind"
//         />
//       </SearchForm>
//     </Header>
//   );
// };

// SearchBar.propTypes = {
//   onSubmit: propTypes.func.isRequired,
// };
