package com.google.sps.data;

/** An user comment. */
public final class Comment {

  private final long id;
  private final String userComment;
  private final long timestamp;

  public Comment(long id, String userComment, long timestamp) {
    this.id = id;
    this.userComment = userComment;
    this.timestamp = timestamp;
  }
}