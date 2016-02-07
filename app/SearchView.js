/**
 * Created by Craig on 07/02/2016.
 */

class SearchView {
  constructor({ searchAction }) {
    this.postcodeInput = document.getElementById('input-postcode');
    this.getCoordinatesButton = document.getElementById('getCoordinates');
    this.searchAction = searchAction;
    this.getCoordinatesButton.onclick = this.searchForCoordinates.bind(this);
  }

  searchForCoordinates() {
    let postcodes = this.postcodeInput.value.split('\n');
    this.searchAction(postcodes);
  }
}

export default SearchView;
