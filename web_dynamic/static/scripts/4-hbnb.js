$(document).ready(function () {
    const selectedAmenities = {};
  
    // Check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  
    // Handle amenities checkbox changes
    $('input[type="checkbox"]').change(function () {
      const amenityId = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');
  
      if (this.checked) {
        selectedAmenities[amenityId] = amenityName;
      } else {
        delete selectedAmenities[amenityId];
      }
  
      const amenityNames = Object.values(selectedAmenities);
      if (amenityNames.length > 0) {
        $('div.Amenities h4').text(amenityNames.join(', '));
      } else {
        $('div.Amenities h4').html('&nbsp;');
      }
    });
  
    // Function to fetch places dynamically
    function fetchPlaces(dataPayload) {
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataPayload),
        success: function (data) {
          $('section.places').empty(); // Clear existing places
          for (const place of data) {
            const article = `
              <article>
                <div class="title">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">
                  ${place.description || 'No description available.'}
                </div>
              </article>`;
            $('section.places').append(article);
          }
        }
      });
    }
  
    // Fetch places on button click with selected amenities
    $('button').click(function () {
      const dataPayload = { amenities: Object.keys(selectedAmenities) };
      fetchPlaces(dataPayload);
    });
  
    // Initial fetch with no filters
    fetchPlaces({});
  });
  