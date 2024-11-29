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
  });
  