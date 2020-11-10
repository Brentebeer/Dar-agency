import React from "react"
import {useStaticQuery, graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/Seo"
import {
    Wrapper,
    Image,
    BottomEdgeDown,
    BottomEdgeUp,
} from "./pageStyles/pageStyles"
import {COLORS} from "../constants"

const AboutUsPage = () => {
    const {
        wpcontent: {
            page: {
                aboutUsMeta: {aboutUsPageDescription, aboutUsPageHeaderPicture},

            },
        },
    } = useStaticQuery(graphql`
    query {
        wpcontent {
          page(id: "about-us", idType: URI) {
                  aboutUsMeta {
                      aboutUsPageDescription
                      aboutUsPageHeaderPicture {
                        sourceUrl
                        imageFile {
                          childImageSharp{
                            fluid(quality: 100) {
                              ...GatsbyImageSharpFluid_withWebp
                            }
                          }
                        }
                          altText
                      }
                  }
              }
          }
        }
    `)
    //console.log(data);
    return (
        
        <Layout>
            <Wrapper descriptionColor={COLORS.PRIMARY}>
                <div className="banner">
                    <Image fluid={aboutUsPageHeaderPicture.imageFile.childImageSharp.fluid} 
                    alt={aboutUsPageHeaderPicture.altText} />
                    <BottomEdgeDown color={COLORS.PRIMARY} />
                </div> 
                <div className="description">
                    <h2>About us</h2>
                    <p>{aboutUsPageDescription}</p>
                    <BottomEdgeUp color={COLORS.BLACK} />
                </div>
            </Wrapper>
        </Layout>
        
    )
}

export default AboutUsPage