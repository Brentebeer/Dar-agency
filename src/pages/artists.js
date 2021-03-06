import React from 'react'
import {useStaticQuery, graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
    Wrapper,
    Image,
    BottomEdgeDown,
    BottomEdgeUp,
    Artist
} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"

const ArtistsPage = () => {
    const {
        wpcontent: {
            page:{ artistsMeta: {
            artistPageDescription,
            artistsPageHeaderPicture
        },},
        artists: {edges: artists},
        },
        
    } = useStaticQuery(graphql`
    query  {
        wpcontent{
          page(id: "artists", idType: URI) {
              artistsMeta {
                  artistsPageDescription
                  artistsPageHeaderPicture {
                    sourceUrl
                    imageFile {
                      childImageSharp{
                        fluid(quality: 50) {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                      altText
                    }
                }
            }
            artists {
                edges {
                    node {
                        artist {
                            firstName
                            lastName
                            artistName
                            profile{
                                altText
                                sourceUrl
                                  imageFile {
                                    childImageSharp{
                                      fluid(quality: 100, grayscale: true) {
                                        ...GatsbyImageSharpFluid_withWebp
                                      }
                                    }
                                  }
                                }
                        }
                        slug
                    }
                }
            }
        }
      }
    `)
    //console.log(data);
    return <Layout>
        <SEO title="Artists" />
        <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
            <div className="banner">
                <Image fluid={artistsPageHeaderPicture.imageFile.childImageSharp.fluid}
                alt={artistsPageHeaderPicture.altText}/>
                <BottomEdgeDown color={COLORS.SECONDARY} />
            </div>
            <div className="description">
                <h2>We are Obi Agency</h2>
                <p>{artistPageDescription}</p>
                <BottomEdgeUp color={COLORS.BLACK} />
            </div>
            <div className="arrtists">
                <h2>Our Artists</h2>
                <div className="artist-items">
                    {artists.map(({node: {artist, slug}}) => (
                        <Artist to={`/${slug}`} key={slug}>
                            <Image fluid={artist.profile.imageFile.childImageSharp.fluid} alt={artist.profile.altText} />
                            <div className="artist-info">
                            <p>{artist.FirstName} {artist.lastName}</p>
                                {artist.artistName && <p>{artist.artistName}</p>}
                            </div>
                        </Artist>
                    ))}
                </div>
            </div>
        </Wrapper>
    </Layout>
}

export default ArtistsPage