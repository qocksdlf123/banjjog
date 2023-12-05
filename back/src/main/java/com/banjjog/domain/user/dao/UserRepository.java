package com.banjjog.domain.user.dao;

import com.banjjog.domain.user.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {

    @Query("select u from Users u where u.myName = :myName and u.yourName = :yourName")
    Users isExistUser(@Param("myName") String myName,
                                      @Param("yourName") String yourName);

    @Query("select count(u.userId) from Users u")
    Integer countUsers();
}
