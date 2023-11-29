package com.banjjog.domain.user.dto;

import lombok.Data;
import lombok.Getter;

import javax.persistence.Column;
@Data
public class UserCreateRequestDto {

    String myName;

    String yourName;

}
