import { gql } from "@apollo/client";

export const GET_ANIMES = gql`
  query getAnimes($search: String, $id_in: [Int]) {
    Page(page: 1, perPage: 50) {
      pageInfo {
        total
        perPage
      }
      media(search: $search, type: ANIME, sort: TRENDING_DESC, id_in: $id_in) {
        id
        title {
          english
          native
        }
        description
        bannerImage
        coverImage {
          extraLarge
          large
          medium
        }
        averageScore
      }
    }
  }
`;

export const GET_ANIME = gql`
  query getAnime($id: Int) {
    Media(id: $id) {
      id
      title {
        english
        native
      }
      description
      type
      genres
      status
      bannerImage
      coverImage {
        extraLarge
        large
        medium
        color
      }
      averageScore
    }
  }
`;
