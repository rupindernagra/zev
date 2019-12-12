import React, { Component } from 'react';
import {
    FacebookShareButton, FacebookIcon,
    LinkedinShareButton, LinkedinIcon,
    TwitterShareButton, TwitterIcon,
    TelegramShareButton, TelegramIcon,
    WhatsappShareButton, WhatsappIcon,
    PinterestShareButton, PinterestIcon,
    RedditShareButton, RedditIcon,
    TumblrShareButton, TumblrIcon,
    EmailShareButton, EmailIcon,
    LivejournalShareButton, LivejournalIcon
} from 'react-share';

export default class SocialShare extends Component {
    static defaultProps = {
        url: document.documentURI
    };
    render() {
        const { url } = this.props;
        return (
            <>
                <div className="share-social-icon">
                    <FacebookShareButton url={url}>
                        <FacebookIcon size={32} borderRadius={5} />
                    </FacebookShareButton>
                </div>
                <div className="share-social-icon">
                    <LinkedinShareButton url={url}>
                        <LinkedinIcon size={32} borderRadius={5} />
                    </LinkedinShareButton>
                </div>
                <div className="share-social-icon">
                    <TwitterShareButton url={url}>
                        <TwitterIcon size={32} borderRadius={5} />
                    </TwitterShareButton>
                </div>
                <div className="share-social-icon">
                    <TelegramShareButton url={url}>
                        <TelegramIcon size={32} borderRadius={5} />
                    </TelegramShareButton>
                </div>
                <div className="share-social-icon">
                    <WhatsappShareButton url={url}>
                        <WhatsappIcon size={32} borderRadius={5} />
                    </WhatsappShareButton>
                </div>
                <div className="share-social-icon">
                    <PinterestShareButton url={url}>
                        <PinterestIcon size={32} borderRadius={5} />
                    </PinterestShareButton>
                </div>
                <div className="share-social-icon">
                    <RedditShareButton url={url}>
                        <RedditIcon size={32} borderRadius={5} />
                    </RedditShareButton>
                </div>
                <div className="share-social-icon">
                    <TumblrShareButton url={url}>
                        <TumblrIcon size={32} borderRadius={5} />
                    </TumblrShareButton>
                </div>
                <div className="share-social-icon">
                    <EmailShareButton url={url}>
                        <EmailIcon size={32} borderRadius={5} />
                    </EmailShareButton>
                </div>
                <div className="share-social-icon">
                    <LivejournalShareButton url={url}>
                        <LivejournalIcon size={32} borderRadius={5} />
                    </LivejournalShareButton>
                </div>
            </>
        )
    }
}