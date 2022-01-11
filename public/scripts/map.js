    // Initialize and add the map
    function initMap() {
      // The location of Ottawa
      const ottawa = { lat: 45.424721, lng: -75.695000 };
      // The map, centered at Ottawa
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: ottawa,
      });

      const pins = {
        ottawa: {lat: 45.424721,lng: -75.695000},
        toronto: {lat: 43.653908, lng: -79.384293}
      }

      for (const element in pins) {
        const marker = new google.maps.Marker({
          position: pins[element],
          map: map
        })
      }
      map.zoom = 5;

      // The marker, positioned at Ottawa
      // const marker = new google.maps.Marker({
      //   position: ottawa,
      //   map: map,
      // });
    }
