/**
 * Created by Craig on 07/02/2016.
 */

class ResultsView {
  constructor() {
    this.containerElement = document.getElementById('location-results');
    this.tableElement = document.createElement('table');
    this.tableElement.className = 'table table-condensed table-hover';
    this.tbody = document.createElement('tbody');
    this.tableElement.innerHTML = `
      <thead>
        <tr>
          <th>Postcode</th>
          <th>Longitude</th>
          <th>Latitude</th>
        </tr>
      </thead>
    `;
    this.tableElement.appendChild(this.tbody);
    this.containerElement.appendChild(this.tableElement);
  }

  clearTable() {
    this.tbody.innerHTML = '';
  }

  render(locations) {

    let tr = document.createElement('tr');

    tr.innerHTML = locations.map(location => `
      <td>${location.address_components[0].long_name}</td>
      <td>${location.geometry.location.lng()}</td>
      <td>${location.geometry.location.lat()}</td>
    `);

    this.tbody.appendChild(tr);

  }

  getTableHTML() {
    return this.tableElement.outerHTML;
  }
}

export default ResultsView;
