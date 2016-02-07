/**
 * Created by Craig on 07/02/2016.
 */

import google from 'google';

class PostcodeService {
  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  /**
   *
   * @param postcode
   * @returns {Promise}
   */
  getPostcodeLocation({postcode}) {
    return new Promise((resolve, reject) => {

      this.geocoder.geocode({'address': postcode}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });

    });

  }
}

export default PostcodeService;
