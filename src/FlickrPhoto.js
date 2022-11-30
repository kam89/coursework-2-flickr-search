import React from "react";
import {
  ImageListItem,
  ImageListItemBar,
  IconButton,
  ButtonBase,
} from "@mui/material";
import { Info } from "@mui/icons-material";

export const FlickrPhoto = ({ data, handleOnPhotoClick }) => {
  if (!data) return;
  return data.map((item, index) => (
    <ButtonBase key={{ index }} onClick={() => handleOnPhotoClick(item)}>
      <ImageListItem>
        <img
          src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`}
          // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          loading="lazy"
        />
        <ImageListItemBar
          title={item.title}
          subtitle={item.author}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${item.title}`}
            >
              <Info />
            </IconButton>
          }
        />
      </ImageListItem>
    </ButtonBase>
  ));
};
