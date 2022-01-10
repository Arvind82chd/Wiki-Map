    // Initialize and add the map
    function initMap() {
      // The location of Ottawa
      const ottawa = { lat: 45.424721, lng: -75.695000 };
      // The map, centered at Ottawa
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: ottawa,
      });
      // The marker, positioned at Ottawa
      const marker = new google.maps.Marker({
        position: ottawa,
        map: map,
      });
    }
