'use strict';
(function () {
  var mapTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var russianHousingTypeMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var getFeaturesFragment = function (featursList) {
    var featuresFragment = document.createDocumentFragment();

    featursList.offer.features.forEach(function (item, index) {
      var newElement = document.createElement('li');
      newElement.classList.add('popup__feature');
      newElement.classList.add('popup__feature--' + featursList.offer.features[index]);
      featuresFragment.appendChild(newElement);
    });
    return featuresFragment;
  };

  var getPhotosFragment = function (photosList, photoPlace) {
    var photosFragment = document.createDocumentFragment();
    var photoTemplate = photoPlace.querySelector('.popup__photo');

    photosList.offer.photos.forEach(function (item) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = item;
      photosFragment.appendChild(photo);
    });
    return photosFragment;
  };

  var createDescription = function (totalAd) {

    var cardElement = mapTemplate.cloneNode(true);

    if (totalAd.offer.title) {
      cardElement.querySelector('.popup__title').textContent = totalAd.offer.title;
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__title'));
    }

    if (totalAd.offer.address) {
      cardElement.querySelector('.popup__text--address').textContent = totalAd.offer.address;
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__text--address'));
    }

    if (totalAd.offer.price) {
      cardElement.querySelector('.popup__text--price').textContent = totalAd.offer.price + ' ₽/ночь';
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__text--price'));
    }


    if (totalAd.offer.type) {
      cardElement.querySelector('.popup__type').textContent = russianHousingTypeMap[totalAd.offer.type];
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__type'));
    }

    if (totalAd.offer.rooms > 0 && totalAd.offer.guests > 0) {
      cardElement.querySelector('.popup__text--capacity').textContent = totalAd.offer.rooms + ' комнаты для ' + totalAd.offer.guests + ' гостей';
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__text--capacity'));
    }

    if (totalAd.offer.checkin && totalAd.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + totalAd.offer.checkin + ', выезд до ' + totalAd.offer.checkout;
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__text--time'));
    }

    var featuresContainer = cardElement.querySelector('.popup__features');

    featuresContainer.innerHTML = '';

    if (totalAd.offer.features.length > 0) {
      var featuresElement = getFeaturesFragment(totalAd);
      featuresContainer.appendChild(featuresElement);
    } else {
      cardElement.removeChild(featuresContainer);
    }

    if (totalAd.offer.description) {
      cardElement.querySelector('.popup__description').textContent = totalAd.offer.description;
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__description'));
    }

    var photosContainer = cardElement.querySelector('.popup__photos');
    if (totalAd.offer.photos.length > 0) {
      var photosElement = getPhotosFragment(totalAd, photosContainer);

      photosContainer.innerHTML = '';
      photosContainer.appendChild(photosElement);
    } else {
      cardElement.removeChild(photosContainer);
    }

    if (totalAd.author.avatar) {
      cardElement.querySelector('.popup__avatar').src = totalAd.author.avatar;
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__avatar'));
    }

    return cardElement;
  };

  window.createDescription = createDescription;
})();
