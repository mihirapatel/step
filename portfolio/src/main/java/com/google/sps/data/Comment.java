package com.google.sps.data;

/** An user comment. */
public final class Comment {

  private final long id;
  private final String userName;
  private final String userComment;
  private final long timestamp;

  public Comment(long id, String userName, String userComment, long timestamp) {
    this.id = id;
    this.userName = userName;
    this.userComment = userComment;
    this.timestamp = timestamp;
  }
}