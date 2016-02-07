/**
 * Created by Craig on 05/02/2016.
 */

import './style.less';
import ResultsView from './ResultsView.js';
import SearchView from './SearchView.js';
import PostcodeService from './PostcodeService.js';
import Clipboard from '../node_modules/clipboard/lib/clipboard.js';

function startApplication() {
  let postcodeService = new PostcodeService();
  let resultsView = new ResultsView();
  let searchView = new SearchView({searchAction: function(postcodes){

    resultsView.clearTable();
    resultsView.markAsLoading();

    Promise.all(postcodes.map((postcode, i)=> {
      return new Promise((resolve, reject) => {

        setTimeout(()=>{

          postcodeService.getPostcodeLocation({ postcode: postcode })
            .then(locations => {
              resultsView.render(locations);
              resolve();
            })
            .catch(error => {
              console.error(error);
              reject();
            });

        }, i * 1000);

      });

    }))
    .then(() => resultsView.markAsLoaded());

  }});

  new Clipboard('#copy-table', {
    text: function(trigger) {
      return resultsView.getTableHTML();
    }
  });

}

window.onload = startApplication;
