import { component$, Resource, useResource$ } from '@builder.io/qwik';
import { RequestEvent, useEndpoint, useLocation } from '@builder.io/qwik-city';
import { Comment } from '../../../components/comment/comment';
import { getStory } from '../../../api';
import type { IStory } from "../../../types";

export const onGet = async (event: RequestEvent) => {
    if (!event.params.id) {
        throw event.response.redirect('/');
    }
    const storyId = Number(event.params.id)
    const story = await getStory(storyId) as IStory;
    return story
}

export default component$(
    () => {
        const endpoint = useEndpoint<typeof onGet>();

        return (
            <Resource
                value={endpoint}
                onPending={() => <div class="news-list-nav">Loading...</div>}
                onResolved={(story) => {
                    return <div class="item-view">
                        <div class="item-view-header">
                            <a href={story.url} target="_blank">
                                <h1>{story.title}</h1>
                            </a>
                            {story.domain && (
                                <span class="host">({story.domain})</span>
                            )}
                            <p class="meta">
                                {story.points} points | by{" "}
                                <a href={`/users/${story.user}`}>{story.user}</a>{" "}
                                {story.time_ago} ago
                            </p>
                        </div>
                        <div class="item-view-comments">
                            <p class="item-view-comments-header">
                                {story.comments_count
                                    ? story.comments_count + " comments"
                                    : "No comments yet."}
                            </p>
                            <ul class="comment-children">
                                {story.comments.map((comment) => (
                                    <Comment comment={comment} />
                                ))}
                            </ul>
                        </div>
                    </div>
                }}
            />
        );
    }
);


